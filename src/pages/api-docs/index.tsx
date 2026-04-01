import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getApiDocs } from '@/lib/swagger';

const SwaggerUI = dynamic<{ spec: any }>(
  () => import('swagger-ui-react'),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async () => {
  const spec = await getApiDocs();
  return {
    props: {
      spec,
    },
  };
};

export default function ApiDocs({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div style={{ padding: '20px' }}>
      <SwaggerUI spec={spec} />
    </div>
  );
}
