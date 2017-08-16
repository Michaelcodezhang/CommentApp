import React,{Component} from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'

class CommentList extends Component{
  static propTypes={
    comments:PropTypes.array,
    onDeleteComment:PropTypes.func
  }
  static defaultProps={
    comments:[]
  }
  handleDeleteComment(index){
    if(this.props.onDeleteComment){
      this.props.onDeleteComment(index)
    }
  }
  render(){
    const comments=this.props.comments
    return(
      <div>{comments.map((comment,i)=>{
        return(<Comment
          comment={comment}
          key={i}
          index={i}
          onDeleteComment={this.handleDeleteComment.bind(this)}/>)})}
      </div>
    )
  }
}

export default CommentList