import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import FavoriteIcon from '@mui/icons-material/Favorite'
import GradeIcon from '@mui/icons-material/Grade'
import { blue, orange, red, yellow } from '@mui/material/colors'
const icons: any = {
  ThumbUpIcon: {
    component: ThumbUpIcon,
    props: {
      sx: { color: blue[700] }
    }
  },
  InsertEmoticonIcon: {
    component: InsertEmoticonIcon,
    props: {
      sx: { color: orange[700] }
    }
  },
  SentimentDissatisfiedIcon: {
    component: SentimentDissatisfiedIcon,
    props: {
      sx: { color: orange[700] }
    }
  },
  SentimentVeryDissatisfiedIcon: {
    component: SentimentVeryDissatisfiedIcon,
    props: {
      sx: { color: orange[700] }
    }
  },
  FavoriteIcon: {
    component: FavoriteIcon,
    props: {
      sx: { color: red[600] }
    }
  },
  GradeIcon: {
    component: GradeIcon,
    props: {
      sx: { color: yellow[700] }
    }
  }
}

export default icons
