var React = require('react');
var ProductModel = require('../models/ParseProductModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {clothing: []}
	},
	componentWillMount: function() {
		var query = new Parse.Query(ProductModel);
		query.equalTo('type', 'Clothing').find().then(
			(c) => {
				this.setState({clothing: c});
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var clothingElements = this.state.clothing.map(function(c) {
			return(
				<tr>
            		<td>{c.get('product')}</td>
            		<td>{c.get('description')}</td>
            		<td>{'$'+c.get('price')}</td>
          		</tr>
			)
		})
		return (
			<div className="container">
				<div className="row">
					<h1>Clothing</h1>
					<table className="striped">
        				<thead>
          					<tr>
              					<th data-field="id">Product Name</th>
              					<th data-field="name">Product Description</th>
              					<th data-field="price">Item Price</th>
          					</tr>
        				</thead>
        				<tbody>
          					{clothingElements}
        				</tbody>
      				</table>
				</div>
			</div>
		);
	}
});