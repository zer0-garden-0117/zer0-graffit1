import { Box, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { TextAnimate } from '@gfazioli/mantine-text-animate';

export interface LogoProps {
  width?: string;
  height?: string;
}

export const Logo: React.FC<LogoProps> = () => {
  const router = useRouter()

  const onClickLogo = () => {
    router.push("/");
  };

  return (
    <Box
      onClick={onClickLogo}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '24px'
      }}
    >
      <TextAnimate.Typewriter
        value="er0 graffit1"
        leftSection={
          <Text c="blue" size="xl" fw={700}>
            z
          </Text>
        }
        animate loop={true}
        withCursor={false}
        speed={0.2}
        variant="gradient"
        size="xl" 
        fw={700}
        gradient={{ from: 'blue', to: 'hotpink', deg: 90 }}
      />
    </Box>
  );
};