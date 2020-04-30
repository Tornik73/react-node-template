import React from 'react'
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import RootRoutes from "./Root.routes";

const RootContainer = (props: any) => {
    return (
        <>
        {
            props.loaderState &&
                    <div className='container__loader'>
                        <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    </div>
        }
        <RootRoutes/>
        </>

    )
}

const mapStateToProps = (state: any) => {
    return {
        isUserAuthenticated: state.authReducer.isUserAuthenticated,
        loaderState: state.loaderReducer.loaderState
    }
};

export default connect(
    mapStateToProps,
)(RootContainer)
