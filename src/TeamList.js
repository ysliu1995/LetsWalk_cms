import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


class TeamList extends React.Component {
	state = {
		roomInfo: [],
		userInfo: [],
		message: [],
	}

	componentDidMount() {
        fetch('https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllRoomInfo')
        .then(res => res.json())
        .then((data) => {
			this.setState({ 
				roomInfo: JSON.parse(data).room,
				userInfo: JSON.parse(data).users,
			})
			console.log(this.state.roomInfo);
			console.log(this.state.userInfo);
        })
        .catch(console.log)
	}

	chooseRoom = (room) => () => {
		var url = new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetRoomInfo"), params = { room:room }
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		fetch(url)
        .then(res => res.json())
        .then((data) => {
			this.setState({ 
				message: JSON.parse(data).message,
			})
			  console.log(this.state.message)
        })
        .catch(console.log)
	}

	render () {
		let data = [];
		if(this.state.roomInfo.length !== 0){
			let len = this.state.roomInfo.length;
			for(let i=0;i<len;i++){
				// console.log(this.state.roomInfo[i]);
				// let id1 = this.state.roomInfo[i].user[0];
				// let name1 = this.state.userInfo.filter(function(item){
				// 	return item.userId === id1 ;      
				// });
				// // console.log(name1[0].userName); 
				// let id2 = this.state.roomInfo[i].user[1];
				// let name2 = this.state.userInfo.filter(function(item){
				// 	return item.userId === id2 ;    
				// });
				// console.log(name2[0].userName); 

				data.push(
					<Paper>
						<List>
							<ListItem button onClick={this.chooseRoom(this.state.roomInfo[i].id)}>
								<ListItemAvatar>
									<Avatar/>
								</ListItemAvatar>
								<ListItemText>
									{ this.state.userInfo[this.state.roomInfo[i].user[0]] }
								</ListItemText>
								<ListItemAvatar>
									<Avatar/>
								</ListItemAvatar>
								<ListItemText>
									{ this.state.userInfo[this.state.roomInfo[i].user[1]] }
								</ListItemText>
								<ListItemText>
									{ this.state.roomInfo[i].active !== 0 ? "已解除": "組隊中"}
								</ListItemText>
							</ListItem>
						</List>
					</Paper>
				)
			}
		}
        
		return (
			<div>
				<Grid container spacing={1}>
					<Grid item xs={4}>
						{ data }
					</Grid>
					<Grid item xs={8}>
						<Paper style={{ height:"600px", overflow: "scroll" }}>
							<List>
								{this.state.message.map((value, index, array) => (
									<ListItem>
										<ListItemText>
											{ this.state.userInfo[this.state.message[index].sender] } : { this.state.message[index].message }
										</ListItemText>
									</ListItem>
								))}
							</List>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}
export default TeamList;