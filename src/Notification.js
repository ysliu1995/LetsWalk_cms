import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

class Notitfication extends React.Component {
	state = {
		userinfo: [],
		left: [],
		right: [],
		message: "",
	}

	componentDidMount() {
        fetch('https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllUserInfo')
        .then(res => res.json())
        .then((data) => {
			  this.setState({ userinfo: JSON.parse(data) })
			  console.log(this.state.userinfo.userinfo)
			  let left = [];
			  for (const key in this.state.userinfo.userinfo) {
				  left.push(key)
			  }
			  this.setState({
				  left: left
			  });
        })
        .catch(console.log)
	}


	handleToggle = (value, position) => () => {
		const left = this.state.left;
		const right = this.state.right;
		if(position === 'left'){
			const currentIndex = this.state.left.indexOf(value);
			// console.log(currentIndex)
			left.splice(currentIndex, 1);
			right.push(value);
		} else {
			const currentIndex = this.state.right.indexOf(value);
			// console.log(currentIndex)
			right.splice(currentIndex, 1);
			left.push(value);
		}
		this.setState({
			right: right,
			left: left,
		});
		// console.log(this.state.left);
		// console.log(this.state.right);
	
	};
	
	handleAllRight = () => {
		let right = this.state.right.concat(this.state.left);
		this.setState({
			right: right,
			left: [],
		});
	};

	handleAllLeft = () => {
		let left = this.state.left.concat(this.state.right);
		this.setState({
			right: [],
			left: left,
		});
	};

	sendMessage = () => {
		const right = this.state.right;
		let tokens = [];
		let message = this.state.message;
		for(let i=0;i<right.length;i++){
			tokens.push(this.state.userinfo.userinfo[right[i]].fcmtoken)
		}
		console.log(tokens);
		console.log(message)
		var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendToClient"), params = {users:tokens, message:message}
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		fetch(url)
        .then(res => res.json())
        .then((data) => {
			  console.log(data)
        })
        .catch(console.log)
	}

	render () {
		return (
			<Grid container spacing={1} justify="center" alignItems="center" >
				<Grid item xs={2}>
					<Card style = {{width: 200,
								height: 600,
								overflow: 'auto',}}>
						<CardHeader 
							title = "尚未選擇"
						/>
						{this.state.left.map((index) => (
							<List>
								<ListItem button onClick={this.handleToggle(index, 'left')}>
								<ListItemAvatar>
									<Avatar/>
								</ListItemAvatar>
								<ListItemText>
									{ this.state.userinfo.userinfo[index].name }
								</ListItemText>
								</ListItem>
							</List>
						))}
					</Card>
				</Grid>
				<Grid item xs={1}>
					<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						onClick={this.handleAllRight}
						// disabled={this.left.length === 0}
						// aria-label="move all right"
					>
						≫
					</Button>
					<Button
						variant="outlined"
						size="small"
						onClick={this.handleAllLeft}
						// disabled={this.right.length === 0}
						// aria-label="move all left"
					>
						≪
					</Button>
					</Grid>
				</Grid>
				<Grid item xs={2}>
					<Card style = {{width: 200,
								height: 600,
								overflow: 'auto',}}>
						<CardHeader 
							title = "已選擇"
						/>
						{this.state.right.map((index) => (
							<List>
								<ListItem button onClick={this.handleToggle(index, 'right')}>
								<ListItemAvatar>
									<Avatar/>
								</ListItemAvatar>
								<ListItemText>
									{ this.state.userinfo.userinfo[index].name }
								</ListItemText>
								</ListItem>
							</List>
						))}
					</Card>
				</Grid>
				<Grid item xs={2}/>
				<Grid item xs={5}>
					<div align="center">
						<TextField
							style={{ width:400}}
							multiline
							rows="10"
							variant="outlined"
							value={this.state.message}
  							onChange={e => this.setState({ message: e.target.value })}
						/>
					</div>
					<p></p>
					<div align="center">
						<Button
							variant="contained"
							color="primary"
							onClick={this.sendMessage}
						>
							Send notification
						</Button>
					</div>
				</Grid>
			</Grid>
		);
	}
}
export default Notitfication;



