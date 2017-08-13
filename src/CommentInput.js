import React,{Component} from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component{
  static propTyped={
    onSubmit:PropTypes.func
  }
  constructor (){
    super()
    this.state={
      username:'',
      content:''
    }
  }
  componentWillMount(){
    this._loadUsername()
  }
  componentDidMount(){
    this.textarea.focus()
  }
  _saveUsername(username){
    localStorage.setItem('username',username)
  }
  _loadUsername(){
    const username=localStorage.getItem('username')
    if(username){
      this.setState({
        username:username
      })
    }
  }
  handleUsernameBlur(event){
    this._saveUsername(event.target.value)
  }
  handleUsernameChang(event){
    this.setState({
      username:event.target.value
    })
  }
  handleContentChang(event){
    this.setState({
      content:event.target.value
    })
  }
  handleSubmit(){
    if(this.props.onSubmit){
      this.props.onSubmit({
        username:this.state.username,
        content:this.state.content,
        createdTime:+new Date()
      })
    }
    this.setState({content:''})
  }
  render(){
    return(
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChang.bind(this)}/>
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              value={this.state.content}
              ref={(textarea)=>{this.textarea=textarea}}
              onChange={this.handleContentChang.bind(this)}>
            </textarea>
          </div>
        </div>
        <div className="comment-field-button">
          <button
          onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput