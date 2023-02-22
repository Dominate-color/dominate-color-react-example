import { Stack, Center, Button, Flex, Text, Group } from '@mantine/core';
import { IconCrosshair } from '@tabler/icons-react';
import { useColorWorker } from '../hooks/useColorWorker';
import { DropZone } from './components/DropZone';
import { useEffect, useState } from 'react';
import { CopyColorButton } from './components/CopyButton';

export function Main() {
  const file = useState<File | null>(null);
  const { hanlder, colors, error, loading, setColors } = useColorWorker(
    new URL('./worker.ts', import.meta.url)
  );

  useEffect(() => {
    setColors([]);
  }, [file[0]]);

  return (
    <Center style={{ width: '100%', height: '100vh' }}>
      <Flex align="center" justify="center" gap="md">
        <Flex gap="lg">
          <Stack>
            <div style={{ width: '28px', height: '28px' }} />
            {colors.map((color) => {
              return <CopyColorButton value={color} key={color} />;
            })}
          </Stack>
        </Flex>
        <Stack>
          <DropZone state={file} loading={loading} />
          <Button
            variant="light"
            color={error ? 'red' : undefined}
            onClick={() => {
              const data = file[0];
              if (data) {
                hanlder(data);
              }
            }}
          >
            <IconCrosshair />
          </Button>
          {error && <Text style={{ maxWidth: '230px' }}>{error.message}</Text>}
        </Stack>
      </Flex>
    </Center>
  );
}
