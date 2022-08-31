import React, { Component } from 'react';

class TextField extends Component {
  constructor(props) {
    super(props);

    let type = 'text';
    if (props.type === 'email') type = 'email';
    if (props.type === 'password') type = 'password';

    this.state = {
      type: type,
    };
  }

  render() {
    return (
      <label className='block my-2'>
        <span
          className={
            (this.props.required ? 'after:content-["*"]' : '') +
            ' after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700 text-left'
          }
        >
          {this.props.label}
        </span>
        <input
          type={this.state.type}
          name={this.name}
          className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
          placeholder={this.props.placeholder}
        />
      </label>
    );
  }
}

export default TextField;
