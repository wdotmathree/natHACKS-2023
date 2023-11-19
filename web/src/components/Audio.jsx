const Audio = (props) => {
	const { src, audioRef } = props;

	return <audio autoPlay={true} controls preload="auto" ref={audioRef} src={src}></audio>;
};

export default Audio;
