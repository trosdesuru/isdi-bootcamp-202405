import Container from '../library/Container'

export default function SkeletonLoader() {
    return (
        <main className="flex flex-col items-center gap-4 pt-4 mb-4 
        min-w-screen min-h-screen overflow-y-auto 
        bg-white 
        dark:bg-background_grey">

            {/* Carousel */}

            <div className="w-full h-70 
            bg-dark_white
            dark:bg-background_light_grey 
            animate-pulse">
            </div>

            {/* Popular and Recommended Events */}

            <div className="w-full h-8 
            bg-dark_white 
            dark:bg-background_light_grey animate-pulse mt-6">
            </div>

            <div className="w-full h-80
            bg-dark_white
            dark:bg-background_light_grey animate-pulse">
            </div>

            <Container className="w-full h-8
            bg-dark_white 
            dark:bg-background_light_grey 
            animate-pulse mt-6">
            </Container>

            <Container className="w-[400px] h-40 
            bg-dark_white 
            dark:bg-background_light_grey 
            animate-pulse">
            </Container>

            {/* Banner */}
            
            <Container className="w-full h-64 
            bg-dark_white 
            dark:bg-background_light_grey 
            animate-pulse mt-6">
            </Container>

            {/* Randomly Events */}

            <div className="w-full h-8 
            bg-dark_white 
            dark:bg-background_light_grey animate-pulse mt-6">
            </div>

            <div className="w-full h-40 
            bg-dark_white 
            dark:bg-background_light_grey animate-pulse">
            </div>

            <Container className="w-full h-8 
            bg-dark_white 
            dark:bg-background_light_grey 
            animate-pulse mt-6">
            </Container>

            <Container className="w-[400px] h-40 
            bg-dark_white 
            dark:bg-background_light_grey 
            animate-pulse">
            </Container>

        </main>
    )
}