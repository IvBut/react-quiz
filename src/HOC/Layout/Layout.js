import React, {Component} from "react";
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component{
    state = {
      menu: false
    };

    toggleMenuHandler = () => {
        this.setState({menu: !this.state.menu})
    };

    render() {
        return (
            <div className={classes.Layout}>
                <MenuToggle isOpen={this.state.menu}
                            onToggle={this.toggleMenuHandler}
                />
                <Drawer isOpen={this.state.menu} onClose={()=> this.toggleMenuHandler()}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;
