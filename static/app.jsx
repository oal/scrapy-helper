var WindowFrame = React.createClass({
	getInitialState: function () {
		return {
			selectorActive: null,
			selector: null
		}
	},

	componentDidMount: function () {
		var that = this;
		var node = React.findDOMNode(this.refs.frame);
		$(node).load(function () {
			var frame = $(node.contentWindow.document);
			frame.find('a').attr('href', '#');
			frame.find('head').prepend('<style>.sh-highlight{outline: 2px solid #0ff} .sh-highlight-active{outline: 2px solid #00f}</style>');
			frame.on('click', '*', function (e) {
				e.preventDefault();
				e.stopPropagation();
				that.props.onSelect($(this));
			});
		});
	},

	highlight: function (selector, active) {
		var node = React.findDOMNode(this.refs.frame);
		var frame = $(node.contentWindow.document);

		var klass = 'sh-highlight';
		var stateVar = 'selector';
		if (active) {
			klass += '-active';
			stateVar += 'Active';
		}

		if (this.state[stateVar]) {
			frame.find(this.state[stateVar]).removeClass(klass);
		}
		frame.find(selector).addClass(klass);

		if (active) {
			this.setState({
				selectorActive: selector
			})
		} else {

			this.setState({
				selector: selector
			})
		}
	},

	render: function () {
		return <iframe ref="frame" src={'/get?url='+encodeURIComponent(this.props.url)}
					   className="window-data"></iframe>;
	}
});


var Window = React.createClass({
	getInitialState: function () {
		return {
			url: this.props.initialUrl,
			activeUrl: this.props.initialUrl
		}
	},

	handleChange: function (e) {
		this.setState({
			url: e.target.value
		})
	},

	handleClick: function () {
		this.setState({
			activeUrl: this.state.url
		});
	},

	highlight: function (selector, active) {
		this.refs.frame.highlight(selector, active);
	},

	render: function () {
		var iframe;
		if (this.state.activeUrl) {
			iframe = <WindowFrame ref="frame" url={this.state.activeUrl} onSelect={this.props.onSelect}/>;
		}
		return (
			<div className="window">
				<div className="window-top">
					<input onChange={this.handleChange} type="text" value={this.props.initialUrl}/>
					<button onClick={this.handleClick}>Load website</button>
				</div>
				{iframe}
			</div>
		)
	}
});

var App = React.createClass({
	getInitialState: function() {
		return {
			selector: '',
		}
	},
	onChange: function (e) {
		this.highlight(e.target.value, true);
	},

	onSelect: function (el) {
		this.highlight(el.getPath(), false);
	},

	highlight: function (selector, active) {
		if(!active) {
			this.setState({
				selector: selector
			});
		}
		for (var key in this.refs) {
			this.refs[key].highlight(selector, active);
		}
	},

	render: function () {
		return (
			<div className="container">
				<div className="top">
					<input type="text" onChange={this.onChange} placeholder="Custom CSS selector"/>
					<span className="selector">{this.state.selector}</span>
				</div>
				<div className="windows">
					<Window ref={Math.random()} onSelect={this.onSelect}/>
					<Window ref={Math.random()} onSelect={this.onSelect}/>
					<Window ref={Math.random()} onSelect={this.onSelect}/>
				</div>
			</div>
		);
	}
});

React.render(
	<App/>,
	document.getElementById('app')
);