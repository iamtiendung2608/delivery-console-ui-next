import {forwardRef, useMemo} from "react";
import {TbLoader} from "react-icons/tb";
import clsx from "clsx";
import {twMerge} from "tailwind-merge";

// define all the button attributes
type BaseButtonAttributes = React.ComponentPropsWithoutRef<"button">;

// define the ref type
type Ref = HTMLButtonElement;

type buttonVariant = "regular" | "outline" | "ghost" | "link"
type buttonSize = "regular" | "large" | "small"

type color =
  | "primary"
  | "secondary"
  | "white"
  | "black"
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";

// extend the base button attributes
interface ButtonProps extends BaseButtonAttributes {
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  className?: string,
  size?: buttonSize
  variant?: buttonVariant
  color?: color | string
}


// eslint-disable-next-line react/display-name
const Button = forwardRef<Ref, ButtonProps>( (props, ref) => {
  // destructure neccesary props
  const {type, children, color, size, variant, disabled, isLoading, leftIcon, rightIcon, className, ...rest} = props;

  // determine icon placement
  const {newIcon: icon, iconPlacement} = useMemo( () => {
    let newIcon = rightIcon || leftIcon;

    if (isLoading) {
      newIcon = <TbLoader className="animate-spin" size={25}/>;
    }

    return {
      newIcon,
      iconPlacement: rightIcon ? ("right" as const) : ("left" as const),
    };
  }, [isLoading, leftIcon, rightIcon] );

  return (
    <button
      ref={ref}
      className={twMerge(
        "h-fit w-fit rounded-xl text-xs font-medium transition-all ",
        "disabled:cursor-not-allowed disabled:opacity-50 ",
        size === "large" && "px-5 py-3 text-base",
        size === "regular" && "px-4 py-2 text-sm ",
        size === "small" && "px-2 py-2 ",
        variant === "regular" &&
        `bg-${color} text-white hover:bg-${color} disabled:hover:bg-${color} `,
        variant === "outline" &&
        `border border-${color} text-${color} hover:border-${color}-dark hover:bg-brand-light disabled:border-${color} disabled:bg-transparent `,
        variant === "ghost" &&
        `text-${color} hover:bg-brand-light disabled:hover:bg-transparent `,
        variant === "link" && `text-${color} hover:underline disabled:no-underline `,
        !!icon && 'flex justify-center items-center ',
        className
      )}
      {...rest}
      type={type ? "submit" : "button"}
      disabled={disabled || isLoading}
    >
      {/** render icon before */}
      {icon && iconPlacement === "left" ? (
        <span className={`inline-flex shrink-0 self-center ${children && !isLoading && "mr-2"}`}>{icon}</span>
      ) : null}

      {/** hide button text during loading state */}
      {!isLoading && children}

      {/** render icon after */}
      {icon && iconPlacement === "right" ? (
        <span className={`inline-flex shrink-0 self-center  ${children && !isLoading && "ml-2"}`}>{icon}</span>
      ) : null}
    </button>
  );
} );

// set default props
Button.defaultProps = {
  color: 'primary',
  size: 'regular',
  variant: "regular",
  isLoading: false,
  disabled: false,
  leftIcon: undefined,
  rightIcon: undefined,
};

export default Button;
