import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function Slicemaster({ data }) {
  const { slicemaster } = data;

  return (
    <>
      <SEO title={slicemaster.name} image={slicemaster.image?.asset?.fluid?.src} />
      <div className="center">
        <Img fluid={slicemaster.image.asset.fluid} />
        <h2>
          <span className="mark">{slicemaster.name}</span>
        </h2>
        <p>{slicemaster.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query SlicemasterQuery($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 400) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
