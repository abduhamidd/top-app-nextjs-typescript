import {ProductProps} from './Product.props';
export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  return <div>{product.title}</div>;
};
