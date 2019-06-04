import React from 'react';
import PropTypes from 'prop-types';
import PopupMenu from './PopupMenu';
class SubMenu extends React.Component {
  static propTypes = {
    // parentMenu: PropTypes.object,
    // title: PropTypes.node,
    // children: PropTypes.any,
    selectedKeys: PropTypes.array,
    openKeys: PropTypes.array,
    onClick: PropTypes.func,
    onOpenChange: PropTypes.func,
    // rootPrefixCls: PropTypes.string,
    eventKey: PropTypes.string,
    multiple: PropTypes.bool,
    active: PropTypes.bool, // TODO: remove
    // onItemHover: PropTypes.func,
    onSelect: PropTypes.func,
    // triggerSubMenuAction: PropTypes.string,
    onDeselect: PropTypes.func,
    // onDestroy: PropTypes.func,
    // onMouseEnter: PropTypes.func,
    // onMouseLeave: PropTypes.func,
    // onTitleMouseEnter: PropTypes.func,
    // onTitleMouseLeave: PropTypes.func,
    onTitleClick: PropTypes.func,
    // popupOffset: PropTypes.array,
    isOpen: PropTypes.bool,
    // store: PropTypes.object,
    // mode: PropTypes.oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
    // manualRef: PropTypes.func,
    // itemIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    // expandIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  };
  static defaultProps = {
    // onMouseEnter: function() {},
    // onMouseLeave: function() {},
    // onTitleMouseEnter: function() {},
    // onTitleMouseLeave: function() {},
    onTitleClick: function() {},
    // manualRef: function() {},
    // mode: 'vertical',
    // title: '',
  };
  constructor(props) {
    super(props);
    const eventKey = props.eventKey;
  }
  componentDidMount() {

  }
  componentDidUpdate() {

  }
  addKeyPath = (info) => {
    return {
      ...info,
      keyPath: (info.keyPath || []).concat(this.props.eventKey),
    };
  };
  onSubMenuClick = (info) => {
    // in the case of overflowed submenu
    // onClick is not copied over
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.addKeyPath(info));
    }
  };
  onSelect = (info) => {
    this.props.onSelect(info);
  };
  onDeselect = (info) => {
    this.props.onDeselect(info);
  };
  onDestroy = (key) => {
    this.props.onDestroy(key);
  };
  onOpenChange = (e) => {
    this.props.onOpenChange(e);
  };
  onTitleClick = (e) => {
    const { props } = this;
    console.log(props);
    props.onTitleClick({
      key: props.eventKey,
      domEvent: e,
    });
    if (props.triggerSubMenuAction === 'hover') {
      return;
    }
    this.triggerOpenChange(!props.isOpen, 'click');
    //updateDefaultActiveFirst(props.store, this.props.eventKey, false);
  };
  triggerOpenChange = (open, type) => {
    console.log(open);
    const key = this.props.eventKey;
    const openChange = () => {
      this.onOpenChange({
        key,
        item: this,
        trigger: type,
        open,
      });
    };
    /*if (type === 'mouseenter') {
      // make sure mouseenter happen after other menu item's mouseleave
      this.mouseenterTimeout = setTimeout(() => {
        openChange();
      }, 0);
    } else {*/
      openChange();
    //}
  };
  render() {
    const props = { ...this.props };
    const state = props.state;
    const style = {
      ...props.style,
    };
    //if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    //}
    //const style = {
    //  paddingLeft: props.level * 24
    //};
    let hiddenClassName, isOpen;
    if(state.openKeys.indexOf(props.eventKey) != -1) {
      hiddenClassName = "";
      isOpen = true;
    } else {
      hiddenClassName = "dldh-menu-hidden";
      isOpen = false;
    }
    const title = (
      <div
        className="dldh-menu-submenu-title"
        style={style}
        title={typeof props.title === 'string' ? props.title : undefined}
        onClick={this.onTitleClick}
      >
        {props.title}
      </div>
    );
    return (
      <li className="dldh-menu-submenu">
        {title}
        <PopupMenu
          level={props.level + 1}
          inlineIndent={props.inlineIndent}
          subClassName={'dldh-menu-sub'}
          isOpen={isOpen}
          hiddenClassName={hiddenClassName}
          state={props.state}
          onClick={this.onSubMenuClick}
          onSelect={this.onSelect}
          onDeselect={this.onDeselect}
          onDestroy={this.onDestroy}
          onOpenChange={props.onOpenChange}>
          {props.children}
        </PopupMenu>
      </li>
    );
  } 
}
export default SubMenu;