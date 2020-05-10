import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class TeamList extends React.Component {
	state = {
		roomInfo: [],
		userInfo: [],
		message: [],
		open: false,
	}

	componentDidMount() {
		this.setState({
			open: true,
		});
        fetch('https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllRoomInfo')
        .then(res => res.json())
        .then((data) => {
			this.setState({ 
				roomInfo: JSON.parse(data).room,
				userInfo: JSON.parse(data).users,
			})
			console.log(this.state.roomInfo);
			console.log(this.state.userInfo);
			this.setState({
				open: false,
			});
        })
        .catch(console.log)
	}

	render () {
		let data = [];
		if(this.state.roomInfo.length !== 0){
			let len = this.state.roomInfo.length;
			for(let i=0;i<len;i++){
				data.push(
					<Grid item xs={3}>
						<Paper>
							<List>
								<ListItem button component={Link} to={{pathname: "/teaminfo", state:{roomId: this.state.roomInfo[i].id, userInfo:this.state.userInfo, user1:this.state.roomInfo[i].user[0], user2:this.state.roomInfo[i].user[1]}}}>
									<ListItemText>
										{ this.state.userInfo[this.state.roomInfo[i].user[0]] } & { this.state.userInfo[this.state.roomInfo[i].user[1]] }
									</ListItemText>
									{ this.state.roomInfo[i].active === 1 ?
										<ListItemText style={{backgroundColor : "#37ABA2", textAlign : "center", color: "#FFFFFF"}}>
											組隊中
										</ListItemText> :
										<ListItemText style={{backgroundColor : "#FF5151", textAlign : "center", color: "#FFFFFF"}}>
											已解除
										</ListItemText>
									}
								</ListItem>
							</List>
						</Paper>
					</Grid>
				)
			}
		}
        
		return (
			<div>
				<Grid container spacing={5}>
					<Grid item xs={12}>
						<Breadcrumbs aria-label="breadcrumb">
							<Typography color="textPrimary">隊伍列表</Typography>
						</Breadcrumbs>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={3}>
							{ data }
						</Grid>
					</Grid>
				</Grid>
				<Backdrop style={{ color: '#fff'}} open={this.state.open}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</div>
		);
	}
}
export default TeamList;