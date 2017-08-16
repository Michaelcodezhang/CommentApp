import React,{Component,PropTypes} from 'react'

class Comment extends Component{
  static propTypes={
    comment:PropTypes.object.isRequired,
    onDeleteComment:PropTypes.func,
    index:PropTypes.number
  }
  constructor (){
    super()
    this.state={timeString:''}
  }
  componentWillMount(){
    this._updateTimeString()
    this._timer=setInterval(
      this._updateTimeString.bind(this),
      5000
    )
  }
  componentWillUnmount(){
    clearInterval(this._timer)
  }
  _updateTimeString(){
    const comment=this.props.comment
    const duration=(+Date.now()-comment.createdTime)/1000
    const _timeCounter = (duration)=>{
      if(duration>2592000){
        return `${Math.round(duration/2592000)}个月前`
      }
      else if(duration>86400){
        return `${Math.round(duration/86400)}天前`
      }
      else if(duration>3600){
        return `${Math.round(duration/3600)}小时前`
      }
      else if(duration>60){
        return `${Math.round(duration/60)}分钟前`
      }
      else{
        return `${Math.round(duration)}秒前`
      }
    }
    this.setState({timeString:_timeCounter(duration)})
  }
  _getProcessedContent(content){
    return content
      .replace(/&/g,"&amp;")
      .replace(/</g,"$lt;")
      .replace(/>/g,"$gt;")
      .replace(/"/g,"$quot")
      .replace(/'/g,"$#039")
      .replace(/`([\S\s]+?)`/g,'<code>$1</code>')
  }
  handleDeleteComment(){
    if(this.props.onDeleteComment){
      this.props.onDeleteComment(this.props.index)
    }
  }
  render(){
    const {comment}=this.props
    return (
      <div className="comment">
        <div className="comment-username">
          <span>{comment.username}</span>:
        </div>
        <p dangerouslySetInnerHTML={{
          __html:this._getProcessedContent(comment.content)
        }}/>
        <span className="comment-createdtime">
          {this.state.timeString}
        </span>
        <span
          className="comment-delete"
          onClick={this.handleDeleteComment.bind(this)}>
          删除
        </span>
      </div>
    )
  }
}

export default Comment