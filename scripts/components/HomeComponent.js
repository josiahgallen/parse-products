var React = require('react');
var ProductModel = require('../models/ParseProductModel.js');


module.exports = React.createClass({
	getInitialState: function() {
		return {
			search: []
		}
	},
	render: function() {
		var searchElements = this.state.search.map(function(s) {
			return(
				<tr>
            		<td>{s.get('product')}</td>
            		<td>{s.get('description')}</td>
            		<td>{'$'+s.get('price')}</td>
          		</tr>
			)
		})
		return (
			<div>
				<div className="container">
					<div className="row">
						<form className="col s12" onSubmit={this.search}>
							<h1>Home</h1>
							<div className="row">
								<div className="input-field col s12">
									<input type="text" ref="productName" className="validate" />
								</div>
							</div>
							<div className="row">
								<button className="waves-effect waves-light btn">Search</button>
							</div>
						</form>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<h1>Products</h1>
						<table className="striped">
        					<thead>
          						<tr>
            	  					<th data-field="id">Product Name</th>
            	  					<th data-field="name">Product Description</th>
            	  					<th data-field="price">Item Price</th>
          						</tr>
        					</thead>
        					<tbody>
          						{searchElements}
        					</tbody>
      					</table>
					</div>
				</div>
			</div>
		);
	},
	search: function(e) {
		e.preventDefault();
		console.log('Looking.....');
		var query = new Parse.Query(ProductModel);
		query.equalTo('product', this.refs.productName.getDOMNode().value)
		.find().then(
			(s) => {
				this.setState({search: s});
			},
			(err) => {
				console.log(err);
			}
		);
	}
});