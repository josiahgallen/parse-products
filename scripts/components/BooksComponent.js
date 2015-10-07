var React = require('react');
var ProductModel = require('../models/ParseProductModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {books: []}
	},
	componentWillMount: function() {
		var query = new Parse.Query(ProductModel);
		query.equalTo('type', 'Books').find().then(
			(b) => {
				this.setState({books: b});
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var booksElements = this.state.books.map(function(b) {
			return(
				<tr>
            		<td>{b.get('product')}</td>
            		<td>{b.get('description')}</td>
            		<td>{'$'+b.get('price')}</td>
          		</tr>
			)
		})
		return (
			<div className="container">
				<div className="row">
					<h1>Books</h1>
					<table className="striped">
        				<thead>
          					<tr>
              					<th data-field="id">Product Name</th>
              					<th data-field="name">Product Description</th>
              					<th data-field="price">Item Price</th>
          					</tr>
        				</thead>
        				<tbody>
          					{booksElements}
        				</tbody>
      				</table>
				</div>
			</div>
		);
	}
});