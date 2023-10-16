import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const { Sider } = Layout;

const SideBar = ({ isCollapsed, setIsCollapsed, navItems }) => {
  const history = useHistory();

  const renderNavItems = () => {
    return navItems.map(({ to, label, visibilityCallback }, i) => {
      const isVisible = visibilityCallback?.() ?? true;

      if (!isVisible) return null;

      return (
        <Menu.Item key={i}>
          <NavLink to={to}>{label}</NavLink>
        </Menu.Item>
      );
    });
  };

  useEffect(() => {
    if (navItems?.length === 1) {
      history.push(navItems[0].to);
    }
  }, []);

  if (navItems?.length > 1) {
    return (
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={setIsCollapsed}
        width={200}
        collapsedWidth={0}>
        <Menu>{renderNavItems()}</Menu>
      </Sider>
    );
  }
  return null;
};

SideBar.propTypes = {
  navItems: PropTypes.array,
  isCollapsed: PropTypes.bool,
  setIsCollapsed: PropTypes.func
};

export default SideBar;
