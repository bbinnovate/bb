import Text from "./Text"

const Intro = () => {
    return (
        <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">

            <Text>
                Scr<span className="italic">o</span>ll d<span className="italic">o</span>wn t<span className="italic">o</span> vibe with <span className="italic">th</span>e pixels
            </Text>
            <Text className="text-3xl! text-white/50" delay={0.5}>
                The internet is y<span className="italic">o</span>ur playgr<span className="italic">o</span>und ↓
            </Text>
        </div>
    )
}

export default Intro