import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import moment from "moment";
import { getFatLogs } from "../actions/fatLogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ChartsPage2 extends React.Component {
  static propTypes = {
    getFatLogs: PropTypes.func.isRequired,
    fatLog: PropTypes.object.isRequired
  };

  state = {};

  //this function returns the total fat consumption over an entire week - the weeksAgo argument determines which week will be calculated
  totalFatWeeksAgo = weeksAgo => {
    const wksMinOne = weeksAgo - 1; // we subtract one so that last week (referred to as "ONE week ago") adds 7 x ZERO to the number of days we count backward.

    //finding the dates for each day in the chosen week
    const minusOneDayUTC = moment() // utc - here we
      .subtract(1 + 7 * wksMinOne, "days")
      .startOf("day")
      .toString();

    const minusOneDate = moment(minusOneDayUTC).format("YYYY-MM-DD");

    const minusTwoDateUTC = moment()
      .subtract(2 + 7 * wksMinOne, "days")
      .startOf("day")
      .toString();

    const minusTwoDate = moment(minusTwoDateUTC).format("YYYY-MM-DD");

    const minusThreeDateUTC = moment()
      .subtract(3 + 7 * wksMinOne, "days")
      .startOf("day")
      .toString();

    const minusThreeDate = moment(minusThreeDateUTC).format("YYYY-MM-DD");

    const minusFourDateUTC = moment()
      .subtract(4 + 7 * wksMinOne, "days")
      .startOf("day")
      .toString();

    const minusFourDate = moment(minusFourDateUTC).format("YYYY-MM-DD");

    const minusFiveDateUTC = moment()
      .subtract(5 + 7 * wksMinOne, "days")
      .startOf("day")
      .toString();

    const minusFiveDate = moment(minusFiveDateUTC).format("YYYY-MM-DD");

    const minusSixDateUTC = moment()
      .subtract(6 + 7 * wksMinOne, "days")
      .startOf("day")
      .toString();

    const minusSixDate = moment(minusSixDateUTC).format("YYYY-MM-DD");

    const minusSevenDateUTC = moment()
      .subtract(7 + 7 * wksMinOne, "days")
      .startOf("day")
      .toString();

    const minusSevenDate = moment(minusSevenDateUTC).format("YYYY-MM-DD");

    const minSevenLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusSevenDate;
    });

    const minSevenTot = minSevenLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minSixLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusSixDate;
    });

    const minSixTot = minSixLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minFiveLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusFiveDate;
    });

    const minFiveTot = minFiveLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minFourLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusFourDate;
    });

    const minFourTot = minFourLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minThreeLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusThreeDate;
    });

    const minThreeTot = minThreeLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minTwoLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusTwoDate;
    });

    const minTwoTot = minTwoLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minOneLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusOneDate;
    });

    const minOneTot = minOneLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const tots = [
      minOneTot,
      minTwoTot,
      minThreeTot,
      minFourTot,
      minFiveTot,
      minSixTot,
      minSevenTot
    ];

    const divisor = tots.reduce((div, elem) => (elem === 0 ? div - 1 : div), 7);

    const weekAvg =
      divisor > 0
        ? (minOneTot +
            minTwoTot +
            minThreeTot +
            minFourTot +
            minFiveTot +
            minSixTot +
            minSevenTot) /
          divisor
        : 0;

    return weekAvg;
  };

  componentDidMount() {
    //getting the fat consumption logs for each week and then adding up the weekly totals

    const minOneWeeks = this.totalFatWeeksAgo(1);
    console.log(`minOneWeeks=${minOneWeeks}`);
    const minTwoWeeks = this.totalFatWeeksAgo(2);
    console.log(`minTwoWeeks=${minTwoWeeks}`);
    const minThreeWeeks = this.totalFatWeeksAgo(3);
    const minFourWeeks = this.totalFatWeeksAgo(4);
    const minFiveWeeks = this.totalFatWeeksAgo(5);
    const minSixWeeks = this.totalFatWeeksAgo(6);
    const minSevenWeeks = this.totalFatWeeksAgo(7);

    const weeksArray = [
      minOneWeeks,
      minTwoWeeks,
      minThreeWeeks,
      minFourWeeks,
      minFiveWeeks,
      minSixWeeks,
      minSevenWeeks
    ];

    const divs = weeksArray.reduce(
      (div, elem) => (elem === 0 ? div - 1 : div),
      7
    );

    console.log(`divisorW=${divs}`);

    const avgWeek =
      (minOneWeeks +
        minTwoWeeks +
        minThreeWeeks +
        minFourWeeks +
        minFiveWeeks +
        minSixWeeks +
        minSevenWeeks) /
      divs;

    console.log(
      `sum${minOneWeeks +
        minTwoWeeks +
        minThreeWeeks +
        minFourWeeks +
        minFiveWeeks +
        minSixWeeks +
        minSevenWeeks}`
    );

    console.log(`avgWeek=${avgWeek}`);

    // inserting data into the bar chart
    this.setState({
      dataHorizontal: {
        labels: [
          "Last Week",
          "-2 Weeks",
          "-3 Weeks",
          "-4 Weeks",
          "-5 Weeks",
          "-6 Weeks",
          "-7 Weeks",
          "Weekly Avg(weeks>0g)"
        ],

        datasets: [
          {
            label: "Average Fat(g) Per Day",
            data: [
              this.totalFatWeeksAgo(1),
              this.totalFatWeeksAgo(2),
              this.totalFatWeeksAgo(3),
              this.totalFatWeeksAgo(4),
              this.totalFatWeeksAgo(5),
              this.totalFatWeeksAgo(6),
              this.totalFatWeeksAgo(7),
              avgWeek
            ],
            fill: false,
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(255, 159, 64)",
              "rgba(255, 205, 86)",
              "rgba(75, 192, 192)",
              "rgba(54, 162, 235)",
              "rgba(153, 102, 255)",
              "rgba(201, 203, 207)"
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)"
            ],
            borderWidth: 1
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="app">
        <MDBContainer>
          <h3 className="mt-5">Last Seven Weeks</h3>
          <HorizontalBar
            data={this.state.dataHorizontal}
            options={{ responsive: true }}
          />
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog
});

export default connect(mapStateToProps, { getFatLogs })(ChartsPage2);
