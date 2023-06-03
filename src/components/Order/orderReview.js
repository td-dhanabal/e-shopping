import React, { useEffect, useState } from 'react'
import { TextField, Snackbar, Grid } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
const labels = {

    1: 'Very Bad',
    2: 'Bad',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
};
const useStyles = makeStyles({
    root: {
        width: 250,
        display: 'flex',
    },
    input: {
        display: 'none',
    },
});

function OrderReview() {
    const [value, setValue] = useState(5);
    const [hover, setHover] = useState(-1);
    const classes = useStyles();
    return (
        <div>
            <Grid container>
                <Grid item md={12}>
                    <div className="reviewHeading mar10">
                        <h4 className="fnt_wgt">Rating and Reviews</h4>
                        <h4 className="fnt_wgt">SamgSung M31</h4>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={3} className="review_content">
                    <h4>What makes a good Review</h4>
                    <div className="review_body">
                        <h5>Have you used this product?</h5>
                        <p> Your review should be about your experience with the product.</p>
                        <h5>Why review a product?</h5>
                        <p> Your valuable feedback will help fellow shoppers decide!</p>
                    </div>
                </Grid>
                <Grid item md={9}>
                    <div className="rating_head mar10">
                        <div className="rating_card">
                            <label>Rating the Product</label>
                            <div className={classes.root}>
                                {/* <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={1}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}

                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}

                                /> */}
                                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                                {console.log(value)}
                            </div>
                        </div>
                        <label className="padt15">Review the Product</label>
                        <TextareaAutosize
                            aria-label="minimum height"
                            rowsMin={3}
                            placeholder="Description..." />
                        <TextField
                            className="wid100"
                            id="standard-basic"
                            label="Review Title..." />
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <div className="review_submit">
                            <button>SUBMIT</button>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default OrderReview
