// Imports
import React, { Component } from "react"

import Script from "react-load-script"

const Search = props => {
    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_KEY}&libraries=places`}
          onLoad={props.handleScriptLoad}
        />
        <form onSubmit={props.handleSubmit}>
          <input
            type='text'
            name='address'
            placeholder={props.placeholderText}
            onFocus={props.focusFunc}
            onBlur={props.blurFunc}
            onChange={props.handleChange}
            value={props.address_input}
            id='address-entry'
          />
        </form>
{/* 
        <input
        id='autocomplete'
          placeholder=''
          type='text'
          value={this.state.query}
          onChange={this.handleInput}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
        /> */}
      </div>
    )
}

/* 



*/
export default Search
