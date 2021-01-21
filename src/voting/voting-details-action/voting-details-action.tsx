import React, { useCallback, useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { Skeleton, useGovernorContract, Button } from 'src/common';
import { ProposalState, VotingButton, VotingDetailInfo } from '../common';
import { useVotingDetailsActionStyles } from './voting-details-action.styles';

export type VotingDetailsActionProps = {
  loading: boolean;
  proposalId: string;
  forCount?: number;
  againstCount?: number;
  onUpdate?: () => void;
  status?: string;
};

type Receipt = {
  hasVoted: boolean;
  support: boolean;
  votes: string;
};

export const VotingDetailsAction: React.FC<VotingDetailsActionProps> = (
  props
) => {
  const classes = useVotingDetailsActionStyles();
  const governorContract = useGovernorContract();
  const { account } = useWeb3React<Web3>();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [queued, toggleQueue] = useToggle(false);
  const [executed, toggleExecute] = useToggle(false);

  const { onUpdate } = props;

  const handleVote = useCallback(
    async (value: boolean) => {
      if (!account) return;

      try {
        const castVote = governorContract.methods.castVote(
          props.proposalId,
          value
        );

        await castVote.send({
          from: account,
          gas: await castVote.estimateGas({ from: account })
        });
      } finally {
        onUpdate?.();
      }
    },
    [governorContract, props.proposalId, account, onUpdate]
  );

  const handleExecuteProposal = useCallback(async () => {
    if (!account) return;

    toggleExecute();

    try {
      const execute = governorContract.methods.execute(props.proposalId);

      await execute.send({
        from: account,
        gas: await execute.estimateGas({ from: account })
      });
    } finally {
      onUpdate?.();

      toggleExecute();
    }
  }, [governorContract, props.proposalId, account, onUpdate, toggleExecute]);

  const handleQueueProposal = useCallback(async () => {
    if (!account) return;
    toggleQueue();

    try {
      const queue = governorContract.methods.queue(props.proposalId);

      await queue.send({
        from: account,
        gas: await queue.estimateGas({ from: account })
      });
    } finally {
      onUpdate?.();

      toggleQueue();
    }
  }, [governorContract, props.proposalId, account, onUpdate, toggleQueue]);

  const handleGetVotedStatus = useCallback(async () => {
    if (!account) return;

    const result = await governorContract.methods
      .getReceipt(props.proposalId, account)
      .call();

    if (!result) return;

    const [hasVoted, support, votes] = result;

    setReceipt({
      hasVoted,
      support,
      votes
    });
  }, [governorContract, account, props.proposalId]);

  useEffect(() => {
    handleGetVotedStatus();
  }, [handleGetVotedStatus, props.status]);

  return (
    <>
      {props.loading && <Skeleton height={116} />}
      <div className={classes.root}>
        {!props.loading && (
          <div className={classes.row}>
            {!receipt?.hasVoted &&
              Number(props.status) === ProposalState.Active && (
                <>
                  <VotingButton
                    onClick={() => handleVote(true)}
                    variant="voteFor"
                  >
                    Vote for
                  </VotingButton>
                  <VotingButton
                    onClick={() => handleVote(false)}
                    variant="voteAgainst"
                  >
                    Vote against
                  </VotingButton>
                </>
              )}
            {receipt?.hasVoted && (
              <>
                <VotingDetailInfo
                  active={receipt.support === true}
                  variant="voteFor"
                  total={(props.forCount ?? 0) + (props.againstCount ?? 0)}
                  count={props.forCount}
                >
                  voted for
                </VotingDetailInfo>
                <VotingDetailInfo
                  active={receipt.support === false}
                  variant="voteAgainst"
                  total={(props.forCount ?? 0) + (props.againstCount ?? 0)}
                  count={props.againstCount}
                >
                  voted against
                </VotingDetailInfo>
              </>
            )}
          </div>
        )}
        {ProposalState.Succeeded === Number(props.status) && (
          <Button
            onClick={handleQueueProposal}
            loading={queued}
            disabled={queued}
          >
            Queue
          </Button>
        )}
        {ProposalState.Queued === Number(props.status) && (
          <Button
            onClick={handleExecuteProposal}
            loading={executed}
            disabled={executed}
          >
            Execute
          </Button>
        )}
      </div>
    </>
  );
};
