type IsBetweenOptions = {
  min: number;
  max: number;
  inclusive?: boolean;
};

export const isBetween = (value: number, { min, max, inclusive = true }: IsBetweenOptions) =>
  inclusive ? value >= min && value <= max : value > min && value < max;
