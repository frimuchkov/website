import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from 'src/home';
import {
  VotingProposalDetail,
  VotingProposalList,
  VotingCreateProposal
} from 'src/voting';
import Market from 'src/market/market-forms';
import StakingDetail from 'src/stacking/stacking-detail';
import StakingList from 'src/stacking/stacking-list';
import OracleManage from 'src/oracle/oracle-manage';
import VestingList from 'src/vesting/vesting-list';
import { NotFound } from 'src/not-found';
import { ProfitSplitterForms } from 'src/profit-splitter';
import MonitorContractList from 'src/monitor/monitor-contract-list';
import { URLS } from './urls';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={URLS.home}>
          <Home />
        </Route>
        <Route path={URLS.voting.create}>
          <VotingCreateProposal />
        </Route>
        <Route path={URLS.voting.detail()}>
          <VotingProposalDetail />
        </Route>
        <Route path={URLS.voting.list}>
          <VotingProposalList />
        </Route>
        <Route path={URLS.market}>
          <Market />
        </Route>
        <Route path={URLS.market}>
          <Market />
        </Route>
        <Route path={URLS.stacking.detail()}>
          <StakingDetail />
        </Route>
        <Route path={URLS.stacking.list}>
          <StakingList />
        </Route>
        <Route path={URLS.oracle}>
          <OracleManage />
        </Route>
        <Route path={URLS.vesting}>
          <VestingList />
        </Route>
        <Route path={URLS.monitor}>
          <MonitorContractList />
        </Route>
        <Route path={URLS.profitSplitter}>
          <ProfitSplitterForms />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
