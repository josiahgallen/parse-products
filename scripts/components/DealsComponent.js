var React = require('react');
var ProductModel = require('../models/ParseProductModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {newP: []}
	},
	componentWillMount: function() {
		var query = new Parse.Query(ProductModel);
		query.ascending('price').limit(10).find().then(
			(b) => {
				this.setState({newP: b});
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var newPElements = this.state.newP.map(function(np) {
			return(
				<tr>
            		<td>{np.get('product')}</td>
            		<td>{np.get('description')}</td>
            		<td>{'$'+np.get('price')}</td>
          		</tr>
			)
		})
		return (
			<div className="container">
				<div className="row">
					<h1>Hot Deals</h1>
					<table className="striped">
        				<thead>
          					<tr>
              					<th data-field="id">Product Name</th>
              					<th data-field="name">Product Description</th>
              					<th data-field="price">Item Price</th>
          					</tr>
        				</thead>
        				<tbody>
          					{newPElements}
        				</tbody>
      				</table>
				</div>
			</div>
		);
	}
});