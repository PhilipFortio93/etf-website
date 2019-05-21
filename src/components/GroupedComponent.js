import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  GroupingState,
  IntegratedGrouping,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  Toolbar,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

// import { generateRows } from '../../../demo-data/generator';

export default class GroupedComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'Bloomberg Ticker', title: 'Name' },
        { name: 'Asset Class', title: 'Asset Class' },
      ],
      rows: [
        { 'Bloomberg Ticker': 'Bloomberg Ticker', 'Asset Class': 'Asset Class' },
      ],
      grouping: [{ columnName: 'Asset Class' }],
    };

    this.changeGrouping = grouping => this.setState({ grouping });
  }

  componentWillReceiveProps(newProps) {
    if(newProps.datareq !== this.props.datareq) {

      let data = this.props.datareq.map(function(value){
        return { 'Bloomberg Ticker': value['Bloomberg Ticker'], 'Asset Class': value['Asset Class'] }
      })
      console.log(data)
      this.setState({
        rows: data
      })

    }

  }

  componentDidMount(){

  }

  render() {
    const { rows, columns, grouping } = this.state;
    // console.log(this.props.datareq);

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />
          <IntegratedPaging />
          <DragDropProvider />
          <GroupingState
            grouping={grouping}
            onGroupingChange={this.changeGrouping}
          />
          <IntegratedGrouping />
          <Table />
          <TableHeaderRow showGroupingControls />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showGroupingControls />
          <PagingPanel />
        </Grid>
      </Paper>
    );
  }
}