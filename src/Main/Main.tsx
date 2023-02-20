import { Input, Stack, Center, Button, ColorSwatch, Image, Flex, Text } from '@mantine/core';
import { IconLink, IconCrosshair } from '@tabler/icons-react';
import { useColorWorker } from '../hooks/useColorWorker';
import { useRef, useState } from 'react';

export function Main() {
  const [image, setImage] = useState<string>('');
  const { hanlder, colors, error, loading } = useColorWorker(
    new URL('./worker.ts', import.meta.url)
  );

  const input = useRef<HTMLInputElement>(null);

  return (
    <Center style={{ width: '100%', height: '100vh' }}>
      <Stack align="center" justify="center">
        <Flex gap="lg">
          {image && <Image radius="md" src={image} width="250px" />}
          <Stack>
            {colors.map((color, idx) => {
              return <ColorSwatch color={color} key={`$color-${idx}`} />;
            })}
          </Stack>
        </Flex>

        <Input
          icon={<IconLink />}
          variant="filled"
          placeholder="Your url to img"
          ref={input}
          style={{ width: '100%' }}
        />

        <Button
          variant="light"
          color={error ? 'red' : undefined}
          onClick={() => {
            const data = input.current?.value;
            if (data) {
              setImage(data);
              hanlder(input.current.value);
            }
          }}
          loading={loading}
        >
          <IconCrosshair />
        </Button>
        {error && <Text style={{ maxWidth: '230px' }}>{error.message}</Text>}
      </Stack>
    </Center>
  );
}
