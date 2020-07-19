import React, { useEffect, useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import Context from "../../context/"
import ContentWrapper from "../../styles/ContentWrapper"
import Underlining from "../../styles/Underlining"
import Social from "../social"
import SplashScreen from "../splashScreen"
import Theme from "../../styles/Theme"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 6rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 4rem;
    }
    .hero_pic {
      margin-left: 0.75rem;
      width: 70%;
      height: 70%;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 1rem;
        width: 70%;
        height: 70%;
      }
    }
    .title {
      margin-bottom: 1.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-bottom: 0;
      }
    }
    .subtitle {
      margin-top: -0.75rem;
    }
  }
`

const AnimatedUnderlining = motion.custom(Underlining)

const Hero = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { isIntroDone } = useContext(Context).state

  // Controls to orchestrate animations of greetings, emoji, social profiles, underlining
  const gControls = useAnimation()
  const eControls = useAnimation()
  const sControls = useAnimation()
  const uControls = useAnimation()

  // Start Animations after the splashScreen sequence is done
  useEffect(() => {
    const pageLoadSequence = async () => {
      if (isIntroDone) {
        eControls.start({
          rotate: [0, -10, 12, -10, 9, 0, 0, 0, 0, 0, 0],
          transition: { duration: 2.5, loop: 3, repeatDelay: 1 },
        })
        await gControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 0.4 },
        })
        await sControls.start({
          opacity: 1,
          x: 0,
        })
        // Animate underlining to hover state
        await uControls.start({
          boxShadow: `inset 0 -2rem 0 ${Theme.colors.secondary}`,
          transition: { delay: 0.4, ease: "circOut" },
        })
      }
    }
    pageLoadSequence()
  }, [isIntroDone, eControls, gControls, sControls, uControls])

  return (
    <StyledSection id="hero">
      {!isIntroDone && <SplashScreen />}
      <div>
        <StyledContentWrapper>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={gControls}>
            <Img
              className="hero_pic"
              fluid={frontmatter.image.childImageSharp.fluid}
            />
            <h1 className="title">{frontmatter.title}</h1>
            <h2 className="subtitle">
              {frontmatter.subtitlePrefix}{" "}
              {/* Hover state color can be set in useEffect hook */}
              <AnimatedUnderlining animate={uControls} color="tertiary" big>
                {frontmatter.subtitle}
              </AnimatedUnderlining>
              .
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={sControls}>
            <Social
              fontSize=".95rem"
              padding=".5rem 1.25rem"
              width="auto"
              withIcon
            />
          </motion.div>
        </StyledContentWrapper>
      </div>
    </StyledSection>
  )
}

Hero.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Hero
