var React = require('react');
var ProductModel = require('../models/ParseProductModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {electronics: []}
	},
	componentWillMount: function() {
		var query = new Parse.Query(ProductModel);
		query.equalTo('type', 'Electronics').find().then(
			(e) => {
				this.setState({electronics: e});
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var electronicsElements = this.state.electronics.map(function(e) {
			return(
				<tr>
            		<td>{e.get('product')}</td>
            		<td>{e.get('description')}</td>
            		<td>{'$'+e.get('price')}</td>
          		</tr>
			)
		})
		return (
			<div className="container">
				<div className="row">
					<h1>Electronics</h1>
					<table className="striped">
        				<thead>
          					<tr>
              					<th data-field="id">Product Name</th>
              					<th data-field="name">Product Description</th>
              					<th data-field="price">Item Price</th>
          					</tr>
        				</thead>
        				<tbody>
          					{electronicsElements}
        				</tbody>
      				</table>
				</div>
			</div>
		);
	}
});