import { NavLink } from "react-router"
import PropTypes from 'prop-types'

export const CustomNavLink = ({ href, className, children }) => {

  const linkStyles = 'text-[15px] font-medium text-gray-600 uppercase cursor-pointer border-b-2 border-b-transparent hover:border-b-primary-green transition'

  return (
    <NavLink
      to={href}
      className={({ isActive }) => `${className || ''} ${linkStyles} ${isActive ? 'text-primary-green' : 'text-gray-600'} `}
    >
      {children}
    </NavLink>
  )
}

export const CustomLink = ({ href, className, children }) => {

  const linkStyles = 'text-[15px] font-medium text-gray-600 cursor-pointer'

  return (
    <NavLink
      to={href}
      className={`${className || ''} ${linkStyles} `}
    >
      {children}
    </NavLink>
  )
}


// badges
export const Badges = ({ bgColor, children }) => {

  return (
    <div className={`w-[18px] h-[18px] ${bgColor} text-xs rounded-full flex justify-center items-center text-white`}>
      {children}
    </div>
  )
}

export const Title = ({ level, children, className }) => {
  const safeLevel = [1, 2, 3, 4, 5, 6].includes(level) ? level : 2;
  // const Heading = `h${level}`;
  const Heading = `h${safeLevel}`;

  const classes = `font-medium ${level === 1
    ? 'text-[80px] font-[700] text-primary'
    : level === 2
      ? 'text-[40px] font-[700] text-primary'
      : level === 3
        ? 'text-[28px] font-[700] text-primary'
        : level === 4
          ? 'text-[24px] font-[600] text-primary'
          : level === 5
            ? 'text-[22px] font-[600] text-primary'
            : 'text-[18px] font-[500] text-primary'
    }`;

  return (
    <Heading className={`${className || ''} ${classes}`}>
      {children}
    </Heading>
  )
};

export const BodyOne = ({ children, className }) => {
  const classes = 'text-lg font-normal text-primary-gray mb-4'

  return (
    <p className={`${className || ''} ${classes}`}>
      {children}
    </p>
  )
}

export const BodyTwo = ({ children }) => {
  return (
    <p className="text-base font-semibold text-white">
      {children}
    </p>
  )
}

export const Caption = ({ children }) => {
  return (
    <p className="text-sm font-normal text-primary-gray">
      {children}
    </p>
  )
}

export const Span = ({ children }) => {
  return (
    <span className="text-xs font-semibold text-white">
      {children}
    </span>
  )
};



CustomNavLink.propTypes = {
  href: PropTypes.isRequired,
  className: PropTypes.isRequired,
  children: PropTypes.isRequired,
};

CustomLink.propTypes = {
  href: PropTypes.isRequired,
  className: PropTypes.isRequired,
  children: PropTypes.isRequired,
};

Badges.propTypes = {
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Title.propTypes = {
  level: PropTypes.isRequired,
  children: PropTypes.isRequired,
  className: PropTypes.isRequired,
};