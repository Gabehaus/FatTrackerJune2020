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
    fatLog: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  state = {};

  componentDidMount() {
    //formatted dates and days of the week for last 7 days

    const yesterday = moment() // utc
      .subtract(1, "days")
      .startOf("day")
      .toString();

    const yesterdayDate = moment(yesterday).format("YYYY-MM-DD");
    const yesterdayDay = moment(yesterday).format("dddd");

    const minusTwoDateUTC = moment()
      .subtract(2, "days")
      .startOf("day")
      .toString();

    const minusTwoDate = moment(minusTwoDateUTC).format("YYYY-MM-DD");
    const minusTwoDay = moment(minusTwoDateUTC).format("dddd");

    const minusThreeDateUTC = moment()
      .subtract(3, "days")
      .startOf("day")
      .toString();

    const minusThreeDate = moment(minusThreeDateUTC).format("YYYY-MM-DD");
    const minusThreeDay = moment(minusThreeDateUTC).format("dddd");

    const minusFourDateUTC = moment()
      .subtract(4, "days")
      .startOf("day")
      .toString();

    const minusFourDate = moment(minusFourDateUTC).format("YYYY-MM-DD");
    const minusFourDay = moment(minusFourDateUTC).format("dddd");

    const minusFiveDateUTC = moment()
      .subtract(5, "days")
      .startOf("day")
      .toString();

    const minusFiveDate = moment(minusFiveDateUTC).format("YYYY-MM-DD");
    const minusFiveDay = moment(minusFiveDateUTC).format("dddd");

    const minusSixDateUTC = moment()
      .subtract(6, "days")
      .startOf("day")
      .toString();

    const minusSixDate = moment(minusSixDateUTC).format("YYYY-MM-DD");
    const minusSixDay = moment(minusSixDateUTC).format("dddd");

    const minusSevenDateUTC = moment()
      .subtract(7, "days")
      .startOf("day")
      .toString();

    const minusSevenDate = moment(minusSevenDateUTC).format("YYYY-MM-DD");
    const minusSevenDay = moment(minusSevenDateUTC).format("dddd");

    //getting the fat consumption logs for each day of the last week and then adding up the totals for each day
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

      return adjst === yesterdayDate;
    });

    const minOneTot = minOneLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const totsArray = [
      minOneTot,
      minTwoTot,
      minThreeTot,
      minFourTot,
      minFiveTot,
      minSixTot,
      minSevenTot
    ];

    //this weeds out any days in which no data was entered so that a running daily average is not including said days
    const divisor = totsArray.reduce(
      (div, elem) => (elem === 0 ? div - 1 : div),
      7
    );

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

    // inserting data into the bar chart
    this.setState({
      dataHorizontal: {
        labels: [
          yesterdayDay,
          minusTwoDay,
          minusThreeDay,
          minusFourDay,
          minusFiveDay,
          minusSixDay,
          minusSevenDay,
          "Daily Avg(days>0g)"
        ],

        datasets: [
          {
            label: "Grams Fat Per Day",
            data: [
              minOneTot,
              minTwoTot,
              minThreeTot,
              minFourTot,
              minFiveTot,
              minSixTot,
              minSevenTot,
              weekAvg
            ],
            fill: true,
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(255, 159, 64)",
              "rgba(255, 205, 86)",
              "rgba(75, 192, 192)",
              "rgba(54, 162, 235)",
              "rgba(153, 102, 255)",
              "rgba(201, 203, 207)",
              "rgba(201, 203, 207)"
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
              "rgba(201, 203, 207)"
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
          <h3 className="mt-5">Last Seven Days</h3>
          <HorizontalBar
            data={this.state.dataHorizontal}
            options={{ responsive: true, fill: true }}
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
