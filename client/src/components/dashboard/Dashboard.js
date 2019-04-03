import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCustomer, deleteCustomer } from '../../actions/customerActions';
import Spinner from '../common/Spinner';
import Chart from 'react-google-charts';
 

class Dashboard extends Component {

  constructor() {
        super();

        // an example array of 150 items to be paged
          this.state = {            
        };
			
		//https://react-google-charts.com/area-chart
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

    }



  render() {
  

    return (
      <div>
      
	<div className="row" > 
			  <div className="col-md-5">
			<Chart
		  width={'500px'}
		  height={'300px'}
		  chartType="AreaChart"
		  loader={<div>Loading Chart</div>}
		  data={[
			['Year', 'Sales', 'Expenses'],
			['2013', 1000, 400],
			['2014', 1170, 460],
			['2015', 660, 1120],
			['2016', 1030, 540],
		  ]}
		  options={{
			title: 'Company Performance',
			hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
			vAxis: { minValue: 0 },
			// For the legend to fit, we make the chart area smaller
			chartArea: { width: '50%', height: '70%' },
			// lineWidth: 25
		  }}
		  // For tests
		  rootProps={{ 'data-testid': '1' }}
		/>

		</div>
		
		<div className="col-md-2">
		</div>

		<div className="col-md-5">

		<Chart
		  width={'500px'}
		  height={'300px'}
		  chartType="Bar"
		  loader={<div>Loading Chart</div>}
		  data={[
			['Year', 'Sales', 'Expenses', 'Profit'],
			['2014', 1000, 400, 200],
			['2015', 1170, 460, 250],
			['2016', 660, 1120, 300],
			['2017', 1030, 540, 350],
		  ]}
		  options={{
			// Material design options
			chart: {
			  title: 'Company Performance',
			  subtitle: 'Sales, Expenses, and Profit: 2014-2017',
			},
		  }}
		  // For tests
		  rootProps={{ 'data-testid': '2' }}
		/>
		 </div>
		 </div>
		 
		 <div className="row">
			<div className="col-md-5">
				<Chart
				width={'500px'}
				height={'300px'}
				chartType="PieChart"
				loader={<div>Loading Chart</div>}
				data={[
				['Task', 'Hours per Day'],
				['Work', 11],
				['Eat', 2],
				['Commute', 2],
				['Watch TV', 2],
				['Sleep', 7],
				]}
				options={{
				title: 'My Daily Activities',
				// Just add this option
				is3D: true,
				}}
				rootProps={{ 'data-testid': '2' }}
				/>			
				
			</div>
			<div className="col-md-2">
			</div>
			
			<div className="col-md-5">
			
				<Chart
				width={'500px'}
				height={'400px'}
				chartType="LineChart"
				loader={<div>Loading Chart</div>}
				data={[
				['x', 'dogs'],
				[0, 0],
				[1, 10],
				[2, 23],
				[3, 17],
				[4, 18],
				[5, 9],
				[6, 11],
				[7, 27],
				[8, 33],
				[9, 40],
				[10, 32],
				[11, 35],
				]}
				options={{
				hAxis: {
				title: 'Time',
				},
				vAxis: {
				title: 'Popularity',
				},
				}}
				rootProps={{ 'data-testid': '1' }}
				/>
			
			</div>
		 
		 </div>
		 
		 <div className="row" >
		 
			<div className="col-md-2">
			</div>
			<div className="col-md-8">
					 <Chart
			  width={'500px'}
			  height={'300px'}
			  chartType="GeoChart"
			  data={[
				['Country', 'Popularity'],
				['Germany', 200],
				['United States', 300],
				['Brazil', 400],
				['Canada', 500],
				['France', 600],
				['RU', 700],
			  ]}
			  // Note: you will need to get a mapsApiKey for your project.
			  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
			  mapsApiKey="YOUR_KEY_HERE"
			  rootProps={{ 'data-testid': '1' }}
			/>
		 </div>
		 
		 <div className="col-md-2">
		 </div>
		 </div>
	
 
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
  customers: state.customers,
  auth: state.auth
});

export default connect(mapStateToProps, { getCustomer, deleteCustomer })(Dashboard);
