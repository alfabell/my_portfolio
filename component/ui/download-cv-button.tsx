'use client';

import * as React from 'react';
import { MetalButton } from '@/component/ui/metal-button';
import { cn } from '@/lib/utils';

type Props = {
  filePath?: string;
  fileName?: string;
  className?: string;
};

export function DownloadCvButton({
  filePath = '/cv/muhamad-alfabel.pdf',
  fileName = 'Muhamad-Alfabel-CV.pdf',
  className,
}: Props) {
  const handleDownload = React.useCallback(() => {
    const a = document.createElement('a');
    a.href = filePath;
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [filePath, fileName]);

  return (
    <MetalButton
      variant="success"
      className={cn('mt-8', className)}
      onClick={handleDownload}
    >
      Download CV
    </MetalButton>
  );
}
