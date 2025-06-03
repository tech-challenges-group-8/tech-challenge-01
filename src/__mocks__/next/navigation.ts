export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  reload: () => {},
  back: () => {},
  prefetch: () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
});

export const usePathname = () => '/dashboard';
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [];
