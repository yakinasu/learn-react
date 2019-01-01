import React from 'react'
import ReactDOM from 'react-dom'
import ZipInput from './ZipInput'
import FormInput from './FormInput'

class CustomForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            tel  : '',
            allok: false
        }
        this.oks = {}
    }
    handleChange (e) {
        this.oks[e.name] =  e.isOK
        this.setState({
            [e.name]: e.value,
            allok: (this.oks['email'] && this['tel'])
        })
    }

    handleSubmit (e) {
        window.alert(JSON.stringify(this.state))
        e.preventDefault()
    }

    render() {
        const doChange = e => this.handleChange(e)
        const doSubmit = e => this.handleSubmit(e)

        const emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const asciiFilter = /[^\u0020-\u007e]+/g
        return (
            <form onSubmit={doSubmit}>
                <FormInput name='email' label='メール'
                        value={this.state.mail}
                        filter={asciiFilter}
                        pattern={emailPat}
                        onChange={doSubmit} />
            <FormInput name='tel' label='電話番号'
                        value={this.state.tel}
                        filter={/[^0-9-()+]+$/g}
                        pattern={/[^0-9-()+]+$/g}
                        onChange={doChange} />
            <input type='submit' value='送信'
                    disabled={!this.state.allok} />
            </form>
        )
    }
}
ReactDOM.render(
    <div><CustomForm /></div>,
    document.getElementById('root')
)