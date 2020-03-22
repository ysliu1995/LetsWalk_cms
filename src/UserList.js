import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


class UserList extends React.Component {
	state = {
		userinfo: []
	}

	componentDidMount() {
        fetch('https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllUserInfo')
        .then(res => res.json())
        .then((data) => {
			  this.setState({ userinfo: JSON.parse(data) })
			  console.log(this.state.userinfo)
        })
        .catch(console.log)
	}

	render () {
		let data = [];
		if(this.state.userinfo.length !== 0){
			let len = this.state.userinfo.userinfo.length;
			for(let i=0;i<len;i++){
				data.push(
					<Grid item xs={3}>
						<Paper>
							<List>
								<ListItem>
									<ListItemAvatar>
										<Avatar/>
									</ListItemAvatar>
									<ListItemText>
										{ this.state.userinfo.userinfo[i].name } ({this.state.userinfo.userinfo[i].age}) { this.state.userinfo.userinfo[i].partner !== 0 ? "有組隊": "尚未組隊"}
									</ListItemText>
								</ListItem>
							</List>
						</Paper>
					</Grid>
				)
			}
		}
        
		return (
			<div>
				<Grid container spacing={1}>
					{ data }
				</Grid>
			</div>
		);
	}
}
export default UserList;