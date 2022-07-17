import React from 'react'
import StarRating from 'react-native-star-rating';
export default function CustomStarExample({count}) {
//const[starCount,setstarCount]=React.useState(count)
    return (
      <StarRating
        disabled={false}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={count}
        selectedStar={(rating) => onStarRatingPress(rating)}
        fullStarColor={'red'}
        starSize={20}
      />
    );
  }
 