'use client';

import { PostItem } from '@/lib/types';
import { Box, Card, Text, Group, Badge, Title } from '@mantine/core';
import Link from 'next/link';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { useRouter } from 'next/navigation';

export default function PostCard({ post }: { post: PostItem }) {
  const router = useRouter()
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        </Link>
      </Card.Section>

      <Group
        justify="space-between"
        mt="md"
        mb="xs"
        onClick={() => {router.push(`/posts/${post.slug}`)}}
        style={{
          cursor: 'pointer',
          display: 'inline-block',
          fontSize: '24px'
          }}
      >
        <TextAnimate.Typewriter
          value={post.title}
          href={`/posts/${post.slug}`}
          animate loop={false}
          withCursor={false}
          speed={0.01}
          size="xl" 
          fw={700}
          gradient={{ from: 'blue', to: 'hotpink', deg: 90 }}
        />
      </Group>

      <Text size="sm" c="dimmed" mb="md">
        {post.description}
      </Text>

      <Group gap="xs">
        {post.tags?.map((tag) => (
          <Badge
            color="blue"
            variant="light"
            key={tag}
            radius="md"
            component={Link}
            href={`/tags/${tag}`}
            style={{
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-1px)",
                transition: "transform 0.2s ease",
                backgroundColor: "#e9ecef",
              },
            }}
          >
            {tag}
          </Badge>
        ))}
      </Group>

      <Text size="sm" c="dimmed" mt="md">
        {post.date}
      </Text>
    </Card>
  );
}