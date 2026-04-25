interface ImageDividerProps {
  image: string;
  alt: string;
  height?: string;
}

const ImageDivider = ({ image, alt, height = "300px" }: ImageDividerProps) => {
  return (
    <div className="w-full overflow-hidden" style={{ height }}>
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageDivider;
