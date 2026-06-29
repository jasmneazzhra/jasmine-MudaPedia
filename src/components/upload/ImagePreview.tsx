type Props = {
  image: string;
};

export default function ImagePreview({
  image,
}: Props) {
  if (!image) return null;

  return (
    <img
      src={image}
      alt="Preview"
      className="h-56 w-full rounded-xl object-cover"
    />
  );
}