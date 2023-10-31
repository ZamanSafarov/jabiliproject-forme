
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Details = () => {
    const [expanded, setExpanded] = React.useState(false);

    const [data,setData] =useState({})
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { id } = useParams();
    useEffect(() => {
        axios(`${BASE_URL}/products/${id}`).then((response) => {
            // console.log(response)
            setData(response.data)
        })
    }, [])

    const { category, title, description, image, rating } = data
    return (
        <div className='h-screen flex items-center justify-center'>
            <Card sx={{ maxWidth: 245,minHeight:200 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {title?.slice(0,1)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />

                        </IconButton>
                    }
                    title={category}
                    subheader={`rate - ${rating?.rate}  count  ${rating?.count}`}
                />
                <CardMedia
                    component="img"
                    height="350"
                    image={image}
                    alt={image}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description?.slice(0,20)}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Info :</Typography>
                        <Typography paragraph>
                       {description?.slice(0,220)}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default Details
