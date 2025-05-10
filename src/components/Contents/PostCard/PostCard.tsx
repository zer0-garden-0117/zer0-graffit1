'use client';

import { PostItem } from '@/lib/types';
import { Card, Text, Group, Badge, Image, Title } from '@mantine/core';
import Link from 'next/link';

export default function PostCard({ post }: { post: PostItem }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {post.image && (
        <Card.Section>
          <Image
            src={post.image}
            height={160}
            alt={post.title}
          />
        </Card.Section>
      )}

      <Group justify="space-between" mt="md" mb="xs">
        <Title order={3}>
          <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {post.title}
          </Link>
        </Title>
      </Group>

      <Text size="sm" c="dimmed" mb="md">
        {post.description}
      </Text>

      <Group gap="xs">
        {post.tags?.map((tag) => (
          <Badge key={tag} color="blue" variant="light">
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