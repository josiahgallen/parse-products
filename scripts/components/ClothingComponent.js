var React = require('react');
var ProductModel = require('../models/ParseProductModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			clothing: [],
			pagination: 1
		}
	},
	componentWillMount: function() {
		var query = new Parse.Query(ProductModel);
		query.equalTo('type', 'Clothing').find().then(
			(c) => {
				this.setState({clothing: c});
				var pageArray = [];
				for (var i = 1; i <= this.state.clothing.length; i++) {
					pageArray.push([i]);
				}
				console.log(pageArray.length);
				var pages = Math.ceil(pageArray.length/10);
				this.setState({pagination: pages});
				console.log(this.state.pagination);
				query.equalTo('type', 'Clothing').limit(10).find().then(
					(c) => {
						this.setState({clothing: c});
					},
					(err) => {
						console.log(err);
					}
				)
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
		var linkElements = [];
		for (var i = 1; i <= this.state.pagination; i++) {
			linkElements.push(<li className="waves-effect" ><a href="#!" key={[i]} onClick={this.newTen}>{[i]}</a></li>)
		}
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
				 <ul className="pagination">
				 	<li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
    				{linkElements}
    				<li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
  				</ul>
			</div>
		);
	},
	newTen: function(e) {
		e.preventDefault();
		var pageQuery = new Parse.Query(ProductModel);
		console.log(this.state.pagination);
		var skipThis = (this.state.pagination - 1);
		if (this.key > 1) {
			pageQuery.equalTo('type', 'Clothing').skip(skipThis * 10).limit(10).find().then(
				(pn) => {
					this.setState({clothing: pn})
				},
				(err) => {
					console.log(err);
				}
			)
		} else {
			var query = new Parse.Query(ProductModel);
		query.equalTo('type', 'Clothing').find().then(
			(c) => {
				this.setState({clothing: c});
				var pageArray = [];
				for (var i = 1; i <= this.state.clothing.length; i++) {
					pageArray.push([i]);
				}
				console.log(pageArray.length);
				var pages = Math.ceil(pageArray.length/10);
				this.setState({pagination: pages});
				console.log(this.state.pagination);
				query.equalTo('type', 'Clothing').limit(10).find().then(
					(c) => {
						this.setState({clothing: c});
					},
					(err) => {
						console.log(err);
					}
				)
			},
			(err) => {
				console.log(err);
			}
		);
		}
	}
});