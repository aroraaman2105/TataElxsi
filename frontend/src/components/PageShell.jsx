import { usePageReady } from '../hooks/usePageReady';
import { SkeletonPage } from './design-system/Skeleton';

export default function PageShell({
  children,
  skeleton = 'default',
  className = '',
}) {
  const ready = usePageReady();

  if (!ready) {
    return (
      <div className={className} aria-busy="true" aria-label="Loading page">
        <SkeletonPage variant={skeleton} />
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}
