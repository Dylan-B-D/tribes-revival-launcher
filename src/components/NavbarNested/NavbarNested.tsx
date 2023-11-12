// NavbarNested.tsx

import { Group, Code, ScrollArea, rem, useMantineTheme } from '@mantine/core';
import classes from './NavbarNested.module.css';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { PiCaretRightBold, PiCaretUpBold } from'react-icons/pi';

interface View {
  component?: React.ComponentType;
  path?: string;
  name: string;
  icon?: React.ComponentType;
  subViews?: View[];
  isOpen?: boolean; 
}


interface NavbarNestedProps {
  views: View[];
}

export function NavbarNested({ views: initialViews }: NavbarNestedProps) {
  const theme = useMantineTheme();
  const [views, setViews] = useState(initialViews);

  const toggleSubViews = (name: string) => {
    const updatedViews = views.map(view => {
      if (view.name === name) {
        return { ...view, isOpen: !view.isOpen };
      }
      return view;
    });

    setViews(updatedViews);
  };

  const renderSubViews = (subViews: View[], isOpen: boolean) => {
    const maxHeight = isOpen ? `${subViews.length * 50}px` : '0'; // Adjust 50px to your item height
    const spaceStyle = isOpen ? { marginBottom: '20px' } : {}; // Adjust the bottom margin as needed
  
    return (
      <div className={classes.subViewsContainer} style={{ ...spaceStyle, maxHeight }}>
        {subViews.map(subView => renderLink(subView, true))}
      </div>
    );
  };
  
  
  const renderLink = (view: View, isSubView: boolean = false) => {
    // Check if the view is a parent item (has subViews and no path)
    const isParentItem = view.subViews && !view.path;
  
    // Common icon rendering logic for both parent and sub-views
    const iconElement = view.icon ? (
      <div className={classes.linkIcon}>
        <view.icon />
      </div>
    ) : null;
  
    return isParentItem ? (
      <div
        key={view.name}
        onClick={() => toggleSubViews(view.name)}
        className={classes.linkText}
        style={{ paddingLeft: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {iconElement}
          <span>{view.name}</span>
        </div>
        {/* Optional: Add an icon to indicate expandable items */}
        {view.isOpen ? <PiCaretUpBold /> : <PiCaretRightBold />}
      </div>
    ) : (
      <NavLink
        to={view.path || '/fallback-path'}
        key={view.name}
        className={({ isActive }) =>
          isActive ? `${classes.linkText} ${classes.linkActive}` : classes.linkText
        }
        style={{ paddingLeft: isSubView ? '40px' : '20px' }}
      >
        {iconElement}
        <span>{view.name}</span>
      </NavLink>
    );
  };
  

  const links = views.map((view, index) => {
    const isSpecialItem = view.name === 'Settings';
    return (
      <React.Fragment key={view.name}>
        {isSpecialItem && index !== 0 && ( // Add a separator before 'Login' and 'Settings', but not at the very start
          <div className={classes.navDivider}></div>
        )}
        <div onClick={() => view.subViews && toggleSubViews(view.name)}>
          {renderLink(view)}
        </div>
        {view.subViews && renderSubViews(view.subViews, view.isOpen || false)}
      </React.Fragment>
    );
  });
  
  

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <span className={classes.name} style={{ fontSize: rem(24), fontWeight: 'bold', color: 'rgba(255,255,255,0.8)' }}>T:A Launcher</span>
          <Code fw={700} color={theme.colors.mutedBlue[5]}>Alpha v0.0.1</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}