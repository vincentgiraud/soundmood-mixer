import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import logoImage from '@/assets/images/logo.png'

interface GenreMatch {
  genre: string
  description: string
  emoji: string
  color: string
}

const moodToGenre: Record<string, GenreMatch> = {
  happy: {
    genre: "Pop & Dance",
    description: "Upbeat tracks with infectious melodies and rhythms that make you want to move. Perfect for celebrating life's good moments.",
    emoji: "🎉",
    color: "bg-yellow-100 border-yellow-300"
  },
  sad: {
    genre: "Indie & Alternative",
    description: "Contemplative and emotional music that resonates with deeper feelings. Artists who understand the beauty in melancholy.",
    emoji: "🌧️",
    color: "bg-blue-100 border-blue-300"
  },
  energetic: {
    genre: "Electronic & EDM",
    description: "High-energy beats and synthesizers that pump up your adrenaline. Perfect for workouts or getting hyped.",
    emoji: "⚡",
    color: "bg-orange-100 border-orange-300"
  },
  calm: {
    genre: "Ambient & Chillout",
    description: "Soothing soundscapes and gentle melodies that help you relax and find your center. Ideal for meditation or unwinding.",
    emoji: "🍃",
    color: "bg-green-100 border-green-300"
  },
  romantic: {
    genre: "R&B & Soul",
    description: "Smooth vocals and heartfelt lyrics that capture the essence of love and connection. Perfect for intimate moments.",
    emoji: "💕",
    color: "bg-pink-100 border-pink-300"
  },
  nostalgic: {
    genre: "Classic Rock & Oldies",
    description: "Timeless hits that transport you back to golden eras. Music that tells stories and evokes powerful memories.",
    emoji: "📻",
    color: "bg-purple-100 border-purple-300"
  },
  rebellious: {
    genre: "Rock & Metal",
    description: "Raw power and attitude that channels your inner rebel. Music for those who march to their own beat.",
    emoji: "🤘",
    color: "bg-red-100 border-red-300"
  },
  dreamy: {
    genre: "Dream Pop & Shoegaze",
    description: "Ethereal sounds and atmospheric textures that create a dreamy, otherworldly experience. Perfect for escaping reality.",
    emoji: "☁️",
    color: "bg-indigo-100 border-indigo-300"
  }
}

const moods = Object.keys(moodToGenre)

function App() {
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [showResult, setShowResult] = useState(false)
  const [lastResult, setLastResult] = useKV<GenreMatch | null>('soundmood-last-result', null)

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    const result = moodToGenre[mood]
    setLastResult(result)
    setShowResult(true)
  }

  const handleReset = () => {
    setSelectedMood('')
    setShowResult(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
        <div className="absolute inset-0 bg-background/10 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 pt-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-6"
            >
              <img 
                src={logoImage} 
                alt="SoundMood Mixer Logo" 
                className="w-32 h-32 object-contain drop-shadow-lg"
              />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4 text-foreground bg-background/90 px-6 py-2 rounded-xl backdrop-blur-sm"
            >
              SoundMood Mixer
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-foreground/80 text-lg bg-background/80 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Discover music genres that match your current mood
            </motion.p>
          </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="mood-selector"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <Card className="backdrop-blur-md bg-card/95 border-border/20 shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-foreground">How are you feeling today?</CardTitle>
                  <CardDescription className="text-foreground/70">
                    Choose the mood that best describes how you're feeling right now
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {moods.map((mood) => (
                      <Button
                        key={mood}
                        variant="outline"
                        size="lg"
                        className="h-20 flex-col gap-2 hover:scale-105 transition-transform bg-white/90 hover:bg-white border-white/30 hover:border-white text-foreground"
                        onClick={() => handleMoodSelect(mood)}
                      >
                        <span className="text-2xl">{moodToGenre[mood].emoji}</span>
                        <span className="capitalize font-medium">{mood}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {lastResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-foreground/80 mb-2">Your last result:</p>
                  <Badge variant="secondary" className="text-sm px-3 py-1 bg-secondary/90 text-secondary-foreground border-border/30">
                    {lastResult.emoji} {lastResult.genre}
                  </Badge>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className={`${moodToGenre[selectedMood]?.color} border-2 backdrop-blur-md bg-white/95 shadow-2xl`}>
                <CardHeader className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    {moodToGenre[selectedMood]?.emoji}
                  </motion.div>
                  <CardTitle className="text-3xl mb-2">
                    {moodToGenre[selectedMood]?.genre}
                  </CardTitle>
                  <Badge variant="outline" className="mb-4 capitalize">
                    Mood: {selectedMood}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg leading-relaxed text-foreground/80"
                  >
                    {moodToGenre[selectedMood]?.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-3 justify-center flex-wrap"
                  >
                    <Button 
                      onClick={handleReset}
                      size="lg"
                      className="min-w-32"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 text-foreground/60 text-sm bg-background/80 px-4 py-2 rounded-lg backdrop-blur-sm inline-block"
          >
            <div className="inline-block">
              Discover new music that resonates with your soul 🎶
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  )
}

export default App